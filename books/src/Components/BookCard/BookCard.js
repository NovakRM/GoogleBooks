import React, { useState } from 'react'
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap'
import style from './style.css'

const BookCard = ({ 
        thumbnail,
        title,
        pageCount,
        language,
        authors,
        publisher,
        previewLink,
        infoLink
    }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return <Card className="m-auto">
        <CardImg top src={ thumbnail} alt="img"/>
    </Card>
}

export default BookCard