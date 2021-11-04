import React from 'react'
import {Link} from 'react-router-dom'
export default function Navbar() {
    return (
        <div className="xs:text-center sm:text-left p-5 bg-white-500">
            <Link to='/'>
                <h2 className="text-3xl text-black ml-2">Crescendo Collective</h2>
            </Link>
        </div>
    )
}
