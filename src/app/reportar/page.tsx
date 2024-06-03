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
import AnimationSteps from "./animation"

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
            Toast.fire({icon: 'error',title: 'Debes iniciar sesion, redirigiendo.',})
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
        
        let data = {
            images: [""],
            user_id: JSON.parse(checkSession()).user.id,
            title,
            description,
            map: location,
            status,
            isAdoption
        }


        const { data: insertedData, error } = await supabase
        .from('alert_post')
        .insert(data)  
        .select('id');
    
        if(!error){
            if(insertedData){
                const insertedId = insertedData[0];
                for (const image of cloudinaryImages) {
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('upload_preset', 'mascotasdev');
                    formData.append('folder', `publications/${insertedId.id}`);
                    const res = await fetch(`https://api.cloudinary.com/v1_1/dzcsvr49m/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    const datares = await res.json();
                    urls.push(datares.url)
                }
    
                const { error } = await supabase
                .from('alert_post')
                .update({ images: urls })
                .eq('id', insertedId.id)
            }
            
            
            Toast.fire({
                icon: 'success',
                title: 'Animal reportado, redirigiendo.',
            })
            if(insertedData){
                router.push(`/detalles?q=${insertedData[0].id}`)
            }    
        }
        Toast.fire({
            icon: 'error',
            title: 'Error de conexion con la base de datos',
        })
        console.log(error)
    }

    return (
        <div className={`${styles.container} ${styles.reportar}`}>
            <div className={styles.reportar__steps}>
                <AnimationSteps step={step}/>
                {RenderSteps()}
                <div className={styles.reportar__steps__buttons}>
                    {step > 0 &&
                        <Button theme="light" onClick={() => setStep(step - 1)}>Anterior</Button>
                    }{step <=2 &&
                        <Button theme="light" onClick={() => { enableNext ? setStep(step + 1) : Toast.fire({icon: 'error',title: 'Debes añadir 1 imagen como minimo.',})
                    }}>Siguiente</Button>
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
            <label htmlFor="desaparecido">
                <span>Reportar desaparecido</span>
                <input type="radio" name="type" id="desaparecido" value={0} checked={!isAdoption} onChange={(e) => setAdoption(e.target.value)} />
            </label>
            <label htmlFor="adopcion">
                <p>Dar en adopcion</p>
                <input type="radio" name="type" id="adopcion" value={1} checked={isAdoption} onChange={(e) => setAdoption(e.target.value)} />
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
            return <img src={photo} key={photo} alt="" className={styles.previewImage} draggable={false}/>;
        });
    };

    return (
        <div className={styles.reportar__steps__two}>
            <h2>Por favor sube las fotos de la mascota</h2>
            <label htmlFor="fileinput">
                <input type="file" id="fileinput" multiple onChange={handleImageChange} required maxLength={4} />
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                <span>Selecciona las imagenes</span>
            </label>
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
                <div className={styles.reportar__steps__three__row}>

                <input type="text" placeholder="Titulo o nombre de mascota" required value={title} onChange={(e)=> setTitle(e.target.value)}/>
                {!isAdoption &&
                    <select name="" id="" required onChange={(e)=>setStatus(e.target.value)} value={status}>
                        <option value="retenido" selected={status=='retenido'}>Retenido</option>
                        <option value="visto" selected={status=='visto'}>Visto</option>
                        <option value="busqueda" selected={status=='busqueda'}>En busqueda</option>
                    </select>
                }
                </div>
                <textarea name="" id="" placeholder="Descripcion" required value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
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
            Toast.fire({
                icon: 'error',
                title: 'Geolocalizacion no esta soportada por su navegador',
            })
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
            try {
                const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP}`)
                const dataJson = await data.json()
                console.log(dataJson)
                let locationFromInput = dataJson.results[0].geometry.location
                console.log(locationFromInput, locationFromInput)
                if(Object.keys(dataJson).length > 0 && locationFromInput) {
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
            } catch (error) {
                console.log(error)
                Toast.fire({
                    icon: 'error',
                    title: 'Error al intentar obtener la ubicacion<br/> Intente mover la marca manualmente',
                })
            }
            
        }

        getLocation()
    }
    return (
        <div className={styles.reportar__steps__four}>
            <h2>Selecciona la ubicacion</h2>
            <div className={styles.reportar__steps__four__row}>
                <input type="text" placeholder="Ubicacion" required value={searchLocation} onChange={(e)=>setSearchLocation(e.target.value)}/>
                <Button onClick={searchLocationFunction} theme="default" size="small">Buscar</Button>
            </div>
            <div className={styles.reportar__steps__four__map}>
            <button onClick={()=> centerMap(anchor)} className={styles.reportar__steps__four__map__center}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z"/></svg></button>
                <Map height={400} width={1000} defaultCenter={center} center={center} defaultZoom={17} >
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