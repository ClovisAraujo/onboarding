import React from 'react'

let dt = new Date();

const Footer = () => (
    <div className="row">
        <div className="column"><footer id="footer">&copy; {dt.getFullYear()} - Clovis Araujo</footer></div>
    </div>
)

export default Footer