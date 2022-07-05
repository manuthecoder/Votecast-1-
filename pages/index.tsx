import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home({ isConnected }:any) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("Pollcast")
    const polls = db.collection("Polls")
    const poll = await polls.findOne({});

    console.log(poll)
    
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}