import React from 'react'
import { Card, CardContent, CardHeader, Typography, Image } from '@mui/material'
import { useTranslation } from 'react-i18next'

const PostCard = ({ title, content, createdAt, isImage }) => {
  const { t } = useTranslation()
  return (
    <Card
      variant="outlined"
      sx={{
        width: '80%',
        borderRadius: 3,
        boxShadow: 4,
        margin: 'auto',
        padding: 1,
        mb: 2,
      }}
    >
      <CardHeader title={title} />
      <CardContent style={{ textAlign: 'center' }}>
        {isImage ? (
          <img src={`https://zombie-project.infura-ipfs.io/ipfs/${content}`} alt="post" width="30%"/>
        ) : (
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {t('createdOn')} {createdAt}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PostCard
