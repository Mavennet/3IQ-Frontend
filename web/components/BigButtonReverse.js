import React from "react";
import Button from "@mui/material/Button";
import PropTypes from 'prop-types'
import { Link } from 'next/router'

export default function BigButtonReverse(props) {
    const { title, route, link, sx } = props

    if (route && route.slug && route.slug.current) {
        return (
            <Link
                href={{
                    pathname: '/LandingPage',
                    query: { slug: route.slug.current },
                }}
                as={`/${route.slug.current}`}
            >
                <Button sx={sx}>
                    {title || 'Missing title'}
                </Button>
            </Link>
        )
    }

    if (link) {
        return (

            <Button sx={sx}>
                {title || 'Missing title'}
            </Button>
        )
    }

    return <Button sx={{
        background: '#dc6e19',
        border: '4px solid #dc6e19',
        textTransform: 'none',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            background: 'none',
            color: '#dc6e19',
        }, ...sx
    }}>{title || 'Missing title'}</Button>
}

BigButtonReverse.propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.shape({
        slug: PropTypes.shape({
            current: PropTypes.string,
        }),
    }),
    link: PropTypes.string,
    sx: PropTypes.object,
}

