import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { seedSearchIndex } from '../seed-data';
import { getPeople } from './api/people';

export const getStaticProps = async () => {
  const response = await getPeople();
  await seedSearchIndex(response);

  return {
    props: {
      people: response.results
    }
  }
}

export default function Home({ people }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          People
        </h1>
        {
          // people.map(person => <Person {...person} key={person.login.uuid} />)
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

function Person({name, email}) {
  return <h3>{name},{email}</h3>
}
