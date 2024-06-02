"use client"
import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CarouselItem } from '@/components/CarouselItem/CarouselItem'
import { formatDate } from '@/helpers/date'
import  styles from "@/styles/pages/Buscar.module.scss"

function Buscar() {
    const MAXPETSFORPAGES = 7
    const [data, setData] = useState<any>([{}]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    
    const supabase = createClientComponentClient()

    useEffect(() => {
        const getData = async() =>{
            const { data, error } = await supabase
            .from('alert_post')
            .select('*')
            .range(0, MAXPETSFORPAGES)
            

            setData(data)
            setLoading(false)
        }

        getData()

    }, [])


    useEffect(() => {
        setLoading(true)
        let starting = (MAXPETSFORPAGES+1) * (page - 1);
        let ending = starting + 7;
        const getData = async() =>{
            const { data, error } = await supabase
            .from('alert_post')
            .select('*')
            .range(starting, ending)
            

            setData(data)
            setLoading(false)
        }

        getData()
    }, [page])
    
  return (
    <div className={styles.buscarComponent}>
        <main className={styles.mainContainer}>
            <aside className={styles.aside}>
                <ul>
                    <li><input type='checkbox' />Visto</li>
                    <li><input type='checkbox' />Busqueda</li>
                    <li>Zona</li>
                    <li>Raza</li>
                    <li>Fecha</li>
                </ul>
            </aside>
            {!loading && (
            <div className={styles.columns}>
                
                {Object.keys(data).length > 0 && data.map((item:any)=> (
                    <Link className={styles.carouselItemContainer} href={`/detalles?q=${item.id}`} key={item.id}>
                        <CarouselItem title={item.title} description={item.description} image={item.images && item.images[0] ? item.images[0] : ""} tipo={item.status} datePublished={formatDate(item.created_at)}/>
                    </Link>
                ))}
            </div>
            )}
            {loading &&(
                <h2>Loading</h2>
            )}
        </main>
        {!loading && (
            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page}</span>
                <button disabled={data.length < MAXPETSFORPAGES} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        )}        
    </div>
  )
}

export default Buscar
