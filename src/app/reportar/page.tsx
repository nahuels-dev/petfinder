"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthenticationContext } from "@/context/Authentication"
import Swal from 'sweetalert2'
import styles from '@/styles/pages/Reportar.module.scss'
import { Button } from "@/components/Button"
import { Map, Marker,Draggable  } from "pigeon-maps"
import Location from "@/components/Location"
import Image from "next/image"
import logo from '@/assets/images/logo.png'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {Cloudinary} from "@cloudinary/url-gen";

const Reportar = () => {
    const supabase = createClientComponentClient()
    const cld = new Cloudinary({cloud: {cloudName: 'dzcsvr49m'}});
    const { checkSession } = useContext(AuthenticationContext)
    const [isAdoption, setAdoption] = useState(false)
    const [step, setStep] = useState(0)
    const router = useRouter()
    const [enableNext, setEnableNext] = useState(true)
    
    const [images,setImages] = useState([] as any)
    const [cloudinaryImages, setCloudinaryImages] = useState([] as any)
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [status,setStatus] = useState('')
    const [location,setLocation] = useState([]) as any


    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })
    useEffect(() => {
        if (!checkSession()) {
            Toast.fire({
                icon: 'error',
                title: 'Debes iniciar sesion, redirigiendo.',
            })
            router.push('/iniciar')
        }
    }, [])

    const handleRadioChange = (e: any) => {
        e == 0 ? setAdoption(false) : setAdoption(true)
    }

    const RenderSteps = () => {
        switch (step) {
            case 0:
                return <StepOne setAdoption={handleRadioChange} isAdoption={isAdoption} setNext={setEnableNext} />;
            case 1:
                return <StepTwo setNext={setEnableNext} setFinalImages={setImages} finalImages={images} setCloudinaryImages={setCloudinaryImages}/>
            case 2:
                return <StepThree isAdoption={isAdoption} functions={{title,setTitle,description,setDescription,status,setStatus}}/>
            case 3:
                return <StepFour functions={{location,setLocation}}/>
        }
    }

    const saveData = async ()=>{
        let urls = []
        

        for (const image of cloudinaryImages) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'mascotasdev');
            //Necesitariamos el ID de la publicacion para poder crear la carpeta especifica para esa publicacion
            //formData.append('folder', `publications/${publicationId}`);
            const res = await fetch(`https://api.cloudinary.com/v1_1/dzcsvr49m/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const datares = await res.json();
            urls.push(datares.url)
        }
        
        let data = {
            images: urls,
            user_id: JSON.parse(checkSession()).user.id,
            title,
            description,
            map: location,
            status,
            isAdoption
        }

        const { error } = await supabase
        .from('alert_post')
        .insert(data)
    
        if(!error){
            alert("Subido a la base de datos!")
        }
        console.log(error)
    }

    return (
        <div className={`${styles.container} ${styles.reportar}`}>
            <div className={styles.reportar__steps}>
                {RenderSteps()}
                <div className={styles.reportar__steps__buttons}>
                    {step > 0 &&
                        <Button theme="light" onClick={() => setStep(step - 1)}>Anterior</Button>
                    }{step <=2 &&
                        <Button theme="light" onClick={() => { enableNext && setStep(step + 1) }}>Siguiente</Button>
                    }
                    {step ==3 &&
                        <Button theme="light" onClick={()=>saveData()}>Guardar</Button>
                    }
                </div>
            </div>
        </div>
    )
}

const StepOne = ({ setAdoption, isAdoption, setNext }: any) => {
    useEffect(() => {
        setNext(true)
    }, [])
    return (
        <div className={styles.reportar__steps__one}>
            <h2>Que tipo de publicacion deseas hacer?</h2>
            <label htmlFor="">
                <span>Reportar desaparecido/ busqueda</span>
                <input type="radio" name="type" value={0} checked={!isAdoption} onChange={(e) => setAdoption(e.target.value)} />
            </label>
            <label htmlFor="">
                <p>Dar en adopcion</p>
                <input type="radio" name="type" value={1} checked={isAdoption} onChange={(e) => setAdoption(e.target.value)} />
            </label>
        </div>
    )
}

const StepTwo = ({ setNext,setFinalImages,finalImages,setCloudinaryImages }: any) => {
    const [images, setImages] = useState<File[]>([]);
    useEffect(() => {
        if(finalImages.length > 0){
            setImages(finalImages)
            setNext(true)
        }else{
            setNext(false)
        }
    }, [])
    useEffect(() => {
        images.length > 0 ? setNext(true) : setNext(false)
        images.length > 0 && setFinalImages(images)
    }, [images])

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCloudinaryImages(e.target.files)
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file)) as any;
            setImages((prevImages) => prevImages.concat(fileArray));
            Array.from(e.target.files).map((file: any) => URL.revokeObjectURL(file));
        }
    };

    const renderPhotos = (source: string[]) => {
        return source.map((photo) => {
            return <img src={photo} key={photo} alt="" className={styles.previewImage} />;
        });
    };

    return (
        <div className={styles.reportar__steps__two}>
            <h2>Por favor sube las fotos de la mascota</h2>
            <input type="file" multiple onChange={handleImageChange} required maxLength={4} />
            <div className={styles.reportar__steps__two__images}>
                {renderPhotos(images as any)}
            </div>
        </div>
    );
};

const StepThree = ({ isAdoption,functions }: { isAdoption: boolean,functions:any }) => {
    const {title ,setTitle, description, setDescription, status, setStatus} = functions
    return (
        <div className={styles.reportar__steps__three}>
            <h2>Llena los siguientes datos</h2>
            <div>
                <input type="text" placeholder="Titulo" required value={title} onChange={(e)=> setTitle(e.target.value)}/>
                <textarea name="" id="" placeholder="Description" required value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                {!isAdoption &&
                    <select name="" id="" required onChange={(e)=>setStatus(e.target.value)} value={status}>
                        <option value="retenido" selected={status=='retenido'}>Retenido</option>
                        <option value="visto" selected={status=='visto'}>Visto</option>
                        <option value="busqueda" selected={status=='busqueda'}>En busqueda</option>
                    </select>
                }
            </div>
        </div>
    )
}

const StepFour = ({functions}:any) => {
    const [anchor, setAnchor] = useState([-34.89792, -56.1577984]) as any;
    const [center, setCenter] = useState(anchor) as any
    const {location,setLocation} = functions
    const [searchLocation, setSearchLocation] = useState("")

    const centerMap = (position: any)=>{
        setCenter([position[0] - 0.000001, position[1] - 0.000001])
        setTimeout(()=>{
            setCenter(position)
        },100)
    }
    

    function getMyLocation(): Promise<{ latitude: number; longitude: number }> {
        if (navigator.geolocation) {
            return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.log(error.message);
                        reject(error);
                    }
                );
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
            return Promise.reject(new Error('Geolocation is not supported by this browser.'));
        }
    }

    useEffect( ()=>{
        const fetchLocation = async () => {
            if (location.length > 0) {
                setAnchor(location);
                setCenter(location);
            } else {
                const position = await getMyLocation();
                if (position) {
                    const newLocation = [position.latitude, position.longitude];
                    console.log(newLocation)
                    setAnchor(newLocation);
                    setCenter(newLocation);
                }
            }
        };

        fetchLocation();
    },[])

    useEffect(()=>{
        setLocation(anchor)
    },[anchor])

    const searchLocationFunction = () =>{
        const getLocation = async () => {
            //Pide direccion y te da coordenadas
            const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP}`)
            
            const dataJson = await data.json()
            let locationFromInput = dataJson.results[0].geometry.location
            console.log(locationFromInput, locationFromInput)
            if(Object.keys(dataJson).length > 0) {
                let position = [locationFromInput.lat, locationFromInput.lng]
                centerMap(position)
                setAnchor(position)
            }else{
                alert("no existe")
            }

            //Pide coordenadas y te da datos
            const inverseResult = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationFromInput.lat},${locationFromInput.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP}`)
            const inverseData = await inverseResult.json()
            console.log(inverseData.results[0].address_components)
        }

        getLocation()
    }
    return (
        <div className={styles.reportar__steps__three}>
            <h2>Selecciona la ubicacion</h2>
            <input type="text" placeholder="Ubicacion" required value={searchLocation} onChange={(e)=>setSearchLocation(e.target.value)}/>
            <button onClick={searchLocationFunction}>Buscar Ubicacion</button>
            <Location></Location>
            {anchor}
            <button onClick={()=> centerMap(anchor)}>center</button>
            <div className={styles.mapContainer}>
                <Map height={500} width={1000} defaultCenter={center} center={center} defaultZoom={17} >
                    <Draggable offset={[20, 50]} anchor={anchor} onDragEnd={setAnchor}>
                        <Image 
                            src={logo}
                            alt=""
                            width={40}
                        />
                    </Draggable>
                </Map>
            </div>
        </div>
    )
}

export default Reportar