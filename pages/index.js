import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout';
export default function Home() {
  return (
    <Layout home> 
      <p>Greetings! I am Kan. This is my island in the vast internet. The place where every sailor in that ocean is welcomed!</p>
    </Layout>
  )
}
