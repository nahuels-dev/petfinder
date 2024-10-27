'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: sessionData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  // revalidatePath('/', 'layout')
  // redirect('/')

  return sessionData.user

}

export async function signup(formData: FormData) {
  const supabase = createClient()


  //Upload image to cloudinary then send all data to supabase
  const res = await fetch(`https://api.cloudinary.com/v1_1/dzcsvr49m/   image/upload`, {
    method: 'POST',
    body: formData.get('image'),
  });
  const cloudinaryData = await res.json();
  const imageUrl = cloudinaryData.secure_url;

  // Todo: 
  // Validate data. 
  // Check if the profile image exists or use a placeholder image instead.
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('name') as string,
        age: 27,
        image: imageUrl,
        role: 'user'
      }
    }
  }

  const { error } = await supabase.auth.signUp(userData)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}