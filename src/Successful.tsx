import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from "react";
import { useState } from 'react';
type PropsType = {
    ShowA: (ShowA:any) => void
}
let a = document.querySelector('.toast-header > .btn-close')
export const Successful = ({ShowA}:PropsType) => {
    // @ts-ignore
    a.style.display = "none"
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="position-absolute bottom-0 end-0 col-3 mb-3 me-3"
            style={{minHeight: "85px",maxWidth: '348px' ,float: 'none', margin: 'auto'}}
        >
            <ToastContainer position="bottom-end" className="" style={{zIndex: 1}}>
                <Toast
                    className="d-inline-block bg-success"
                >
                    <Toast.Header onClick={()=> ShowA(true)}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Удачно</strong>
                        <Button>X</Button>
                    </Toast.Header>
                    <Toast.Body className={"text-white"}>
                       Таск удачно добавлен
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}