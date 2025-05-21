import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_API_URL;

const UploadPhotoButton = ({ children, onPhotoUploaded }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Por favor, selecciona una imagen válida (JPEG, PNG o JPG)');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen no debe superar los 2MB');
            return;
        }

        setIsUploading(true);

        try {
            await fetch(`${API_URL}/sanctum/csrf-cookie`, {
                method: 'GET',
                credentials: 'include'
            });

            const formData = new FormData();
            formData.append('photo', file);

            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`${API_URL}/user/upload-photo`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-XSRF-TOKEN': decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || '')
                },
                credentials: 'include',
                body: formData
            });

            const text = await response.text();
            let data;
            
            try {
                data = JSON.parse(text);
            } catch (e) {
                throw new Error('Error al procesar la respuesta del servidor');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error al subir la foto');
            }

            if (onPhotoUploaded) {
                onPhotoUploaded(data.path);
            }

            alert(data.message || 'Foto de perfil actualizada correctamente');
        } catch (error) {
            alert(error.message || 'Error al subir la foto de perfil');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <input
                type="file"
                id="photo-upload"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <div 
                onClick={() => document.getElementById('photo-upload').click()}
                style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                }}
            >
                {isUploading ? (
                    <i className="bi bi-arrow-repeat spin" style={{ fontSize: '1.2rem' }}></i>
                ) : (
                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: '1.2rem', color: 'white' }} />
                )}
            </div>
        </>
    );
};

export default UploadPhotoButton; 