import React, { useState } from 'react';
import styles from './home.module.scss';
import { Link } from 'react-router-dom'
import {
  SiYourtraveldottv,
  SiProducthunt
} from 'react-icons/si'

function Home() {
  const [showModal, setShowModal] = useState(false)

  return (

    <div className={`d-flex vh-100 ${styles.root}`}>
      <div className='d-flex'>
        <div className='m-auto'>
          <h1>Travel</h1>
          <Link className='btn btn-primary'
            as={Link}
            to='/Travel'
            onClick={() => setShowModal(false)
            }
          >
            <SiYourtraveldottv
              style={{ marginBottom: '2px' }}
            />{' '}Search</Link>
        </div>
      </div>
      <div className='d-flex'>
        <div className='m-auto'>
          <h1>Product</h1>
          <Link className='btn btn-primary'
            as={Link}
            to='/Product'
            onClick={() => setShowModal(false)
            }
          >
            <SiProducthunt
              style={{ marginBottom: '2px' }}
            />{' '}Search</Link>
        </div>
      </div>
    </div >
  );
}

export default Home;