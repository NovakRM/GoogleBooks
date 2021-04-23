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
        description,
        previewLink,
        infoLink
    }) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return <Card className="m-auto">
        <CardImg top src={ thumbnail} alt="img"/>
        <CardBody>
            <CardTitle className="card-title"> { title}</CardTitle>
            <Button onClick={toggle}> More Info</Button>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle}>
            <div className="modal-header d-flex justify-content-center">
                <h5 className="modal-title text-center" id="exampleModalLabel">{ title}</h5>
                <button area-label="Close" className="close" type="button" onClick={toggle}>
                    <span aria-hidden> X </span>
                </button>
            </div>
            <div className="modal-body">
                <div className="d-flex justify-content-between">
                    <img src={ thumbnail } alt={ title} className="modalImg"/>
                    <div>
                        <p>Page Count: { pageCount}</p>
                        <p>Language: { language}</p>
                        <p>Authors: { authors}</p>
                        <p>Published By: { publisher}</p>
                    </div>
                </div>
                <div className="mt-3">
                    {description}
                </div>
            </div>

        </Modal>
    </Card>
}

export default BookCard