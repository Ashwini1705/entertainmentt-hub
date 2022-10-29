import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { img_500, unavailable } from '../config/config';
import './ContentModel.css';
import Carousal from '../Carousal/Carousal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: '#39445a',
    border: '2px solid #000',
    color: "white",
    boxShadow: 24,
    p: 4,
};

export default function ContentModel({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [video, setVideo] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        // console.log("content data", data);
        setContent(data);
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        // console.log("video", data)
        setVideo(data.results[0]?.key)
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
    })

    return (
        <div>
            <div className='media' onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='contentModel'>
                            <img
                                className='contentModel_potrait'
                                alt={content.name || content.title}
                                src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />
                            <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable}
                                alt={content.name || content.title}
                                className='contentModel_landscape' />
                            <div className='contentModel_about'>
                                <span className='contentModel_title'>
                                    {content.name || content.title}
                                    ({(content.first_air_date || content.release_date || "----").substring(0, 4)})
                                </span>
                                {content.tagline && <i className='tagline'>{content.tagline}</i>}
                                <span className='contentModel_description'>{content.overview}</span>
                                <div><Carousal media_type={media_type} id={id}/></div>
                                <Button
                                    variant='contained'
                                    startIcon={<YouTubeIcon />}
                                    color='secondary'
                                    target='_blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch The Trailer
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
