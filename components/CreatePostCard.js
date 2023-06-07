import { React, useState } from 'react'
import { TextField, Button, Card, CardContent, Typography, Checkbox, FormControlLabel } from "@mui/material"
import { useTranslation } from "react-i18next"

const CreatePostCard = (props) => {
    const [showPostForm, setShowPostForm] = useState(false)
    const [imageChecked, setImageChecked] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { t } = useTranslation()


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        props.onImagePublishClick(title, selectedFile)
        cleanFields()
    }

    const handleNewPostClick = () => {
        setShowPostForm(true)
    }
    
    const handleCancelClick = () => {
        setShowPostForm(false)
    }

    const handlePublish = () => {
        props.onPublishClick(title, content)
        cleanFields()
    }

    const handleChange = (e) => {
        setImageChecked(e)
      };

    const cleanFields = () => {
        setImageChecked(false)
        setSelectedFile(null)
        setTitle("")
        setContent("")
    }

    return (
        <div>
            {showPostForm ? (
                <Card 
                    variant="outlined"
                    sx={{ width: 800, borderRadius: 3, boxShadow: 4, margin: 'auto', padding: 2, mb: 2 }}
                >
                    <TextField
                        id="title"
                        label={t("title")}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {imageChecked ? (
                        <>
                            <input
                                accept="image/*"
                                id="image-input"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="image-input">
                                <Button component="span" variant="contained" sx={{ mr: 2}} >
                                    Examinar
                                </Button>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder="Seleccionar imagen"
                                    disabled
                                    value={selectedFile ? selectedFile.name : 'Selecciona una imagen'}
                                />
                            </label>
                        </>
                    ) : (
                        <TextField
                            id="content"
                            label={t("content")}
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    )}
                    
                    <div>
                        <Button 
                            variant="contained"
                            sx={{ mr: 2}} 
                            onClick={imageChecked ? handleUpload : handlePublish}
                        >
                            {t("publish")}
                        </Button>
                        <Button 
                            variant="contained"
                            sx={{ mr: 2}} 
                            onClick={handleCancelClick}
                        >
                            {t("cancel")}
                        </Button>
                        <FormControlLabel
                            control={<Checkbox 
                                        checked={imageChecked} 
                                        onChange={e => handleChange(e.target.checked)} />}
                            label="Image"
                        />
                    </div>
                </Card>
            ) : (
                <Card 
                    variant="outlined"
                    sx={{ width: 800, borderRadius: 3, boxShadow: 4, margin: 'auto', padding: 1, mb: 2 }}
                    onClick={handleNewPostClick}
                >
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            {t("publishTitle")}
                        </Typography>
                    </CardContent>                
                </Card>
            )}
        </div>
    )
}

export default CreatePostCard