"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthenticationContext } from "@/context/Authentication"
import Swal from 'sweetalert2'
import styles from '@/styles/pages/Reportar.module.scss'
import { Button } from "@/components/Button"
const Reportar = () => {
    const { checkSession } = useContext(AuthenticationContext)
    const [isAdoption,setAdoption]= useState(false)
    const [step, setStep] = useState(0)
    const router = useRouter()
    const [enableNext, setEnableNext] = useState(true)

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

    const handleRadioChange = (e:any)=>{
        e == 0 ? setAdoption(false) : setAdoption(true)
    }

    const RenderSteps = () => {
        switch (step) {
            case 0:
                return <StepOne setAdoption={handleRadioChange} isAdoption={isAdoption} setNext={setEnableNext}/>;
            case 1:
                return <StepTwo setNext={setEnableNext}/>
            case 2:
                return <StepThree isAdoption={isAdoption} />
            case 3:
                return <StepFour />
        }
    }


    return (
        <div className={`${styles.container} ${styles.reportar}`}>
            <div className={styles.reportar__steps}>
                {RenderSteps()}
                <div className={styles.reportar__steps__buttons}>
                    {step > 0 &&
                        <Button theme="light" onClick={() => setStep(step - 1)}>Anterior</Button>
                    }
                    <Button theme="light" onClick={() =>{enableNext && setStep(step + 1)}}>Siguiente</Button>
                </div>
            </div>


            {/* <form action="">
                <select name="" id="">
                    <option value="">Dar en adopcion</option>
                    <option value="">Reportar desaparecido/ busqueda</option>
                </select>


                <input type="file" multiple capture="environment" required/>
                <input type="text" placeholder="Titulo" required/>
                <textarea name="" id="" placeholder="Description" required></textarea>
    
                <select name="" id="" required>
                    <option value="">Retenido</option>
                    <option value="">Visto</option>
                    <option value="">En busqueda</option>
                </select>
            </form> */}
        </div>
    )
}

const StepOne = ({setAdoption,isAdoption,setNext}:any) => {
    useEffect(()=>{
        setNext(true)
    },[])
    return (
        <div className={styles.reportar__steps__one}>
            <h2>Que tipo de publicacion deseas hacer?</h2>
            <label htmlFor="">
                <p>Reportar desaparecido/ busqueda</p>
                <input type="radio" name="type" value={0} checked={!isAdoption} onChange={(e)=>setAdoption(e.target.value)}/>
            </label>
            <label htmlFor="">
                <p>Dar en adopcion</p>
                <input type="radio" name="type" value={1} checked={isAdoption} onChange={(e)=>setAdoption(e.target.value)}/>
            </label>
        </div>
    )
}

const StepTwo = ({setNext}:any) => {
    const [images, setImages] = useState<File[]>([]);
    useEffect(()=>{
        images.length > 0 ? setNext(true) : setNext(false)
    },[])
    useEffect(()=>{
        images.length > 0 ? setNext(true) : setNext(false)
    },[images])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file)) as any;
            setImages((prevImages) => prevImages.concat(fileArray));
            Array.from(e.target.files).map((file:any) => URL.revokeObjectURL(file));
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
            <input type="file" multiple capture="environment" onChange={handleImageChange} required maxLength={4}/>
            <div className={styles.reportar__steps__two__images}>
                {renderPhotos(images as any)}
            </div>
        </div>
    );
};

const StepThree = ({isAdoption}:{isAdoption:boolean}) => {
    console.log(isAdoption)
    return (
        <div className={styles.reportar__steps__three}>
            <h2>Llena los siguientes datos</h2>
            <input type="text" placeholder="Titulo" required/>
            <textarea name="" id="" placeholder="Description" required></textarea>
            {!isAdoption &&
                <select name="" id="" required>
                    <option value="">Retenido</option>
                    <option value="">Visto</option>
                    <option value="">En busqueda</option>
            </select>
            }
        </div>
    )
}

const StepFour = ()=>{
    return(
        <div className={styles.reportar__steps__three}>
            <h2>Selecciona la ubicacion</h2>
        
        </div>
    )
}
export default Reportar