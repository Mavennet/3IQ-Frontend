import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  PaginationItem
} from '@mui/material'
import RedirectButton from '../../../RedirectButton/RedirectButton'
import CustomNewsletterCard from '../../custom/CustomNewsletterCard/CustomNewsletterCard'
import client from '../../../../client'
import groq from 'groq'

function NewsletterGrid(props) {
  const { currentLanguage, isPaginatedNewsletter, selectedPostCategory } = props

  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 6
  const [newsletters, setNewsletters] = useState(null)
  const [page, setPage] = useState(1)
  const [noOfPages, setNoOfPages] = useState(1)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const PageBackButton = () => (
    <RedirectButton
      title="← Previous"
      reverse={false}
      sx={{
        padding: '10px 20px',
        fontSize: '16px',
        borderColor: '#DC6E19',
        background: 'none',
        color: '#dc6e19',
        fontWeight: '300',
        '&:hover': {
          color: '#fff',
          borderColor: '#fff',
        },
      }}
    />
  )

  const PageForwardButton = () => (
    <RedirectButton
      title="Next →"
      reverse={false}
      sx={{
        padding: '10px 20px',
        fontSize: '16px',
        borderColor: '#DC6E19',
        background: 'none',
        color: '#dc6e19',
        fontWeight: '300',
        '&:hover': {
          color: '#fff',
          borderColor: '#fff',
        },
      }}
    />
  )

  const fetchNewsletters = async () => {
    await client.fetch(
      groq`
      *[_type == 'newsCard' && $categoryId in post->categories[]._ref] {
        _id,
        _type,
        _rev,
        'localeButtonText': buttonText,
        'localeShortDescription': shortDescription,
        route->,
        post-> {
          _id,
          _type,
          mainImage,
          'localeHeading': heading,
          publishedAt,
          categories[]-> {
            _id,
            _type,
            'localeName': name,
          },
          author-> {
            _id,
            _type,
            name,
            email,
            profilePhoto,
          },
        },
      }
      `,
      { categoryId: selectedPostCategory._id }
    )
      .then((response) => {
        response.sort((a,b) => new Date(b.post.publishedAt) -  new Date(a.post.publishedAt))
        setNewsletters(response)
        setNoOfPages(Math.ceil(response.length / itemsPerPage))
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchNewsletters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <Grid
          item
          style={{ display: 'flex' }}
          py={5}
          md={12}
          pr={2}
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        newsletters
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item) => {
            return (
              <Grid
                item
                key={item._id}
                style={{ display: 'flex' }}
                xs={12}
                md={4}
              >
                {console.log(item)}
                <CustomNewsletterCard
                  {...item}
                  languageTag={currentLanguage.languageTag}
                />
              </Grid>
            )
          })
      )}
      {!isLoading && isPaginatedNewsletter && (
        <Grid item xs={12}>
          <Box component="span" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              showFirstButton={true}
              showLastButton={true}
              count={noOfPages}
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: PageBackButton, next: PageForwardButton }}
                  {...item}
                />
              )}
              onChange={handlePageChange}
              defaultPage={1}
              size="small"
              siblingCount={2}
              boundaryCount={1}
              sx={{
                '& .MuiPagination-ul': {
                  justifyContent: 'center',
                  padding: '10px',
                  rowGap: 6,
                },
                mt: '3em',
                mb: '3em',
                textAlign: 'center',
                color: '#dc6e19',
              }}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

NewsletterGrid.propTypes = {
  currentLanguage: PropTypes.object,
  selectedPostCategory: PropTypes.object,
  isPaginatedNewsletter: PropTypes.bool
}

export default NewsletterGrid
