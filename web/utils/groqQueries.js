import groq from 'groq'

const pageFragment = groq`
...,
  content[] {
    _type == 'reference' => @->{
      ...,
      post->{
        ...,
        author->
      },
    },
  }`

export const DATA_COUNTRIES = groq`
*[_type == "country"]{
  name,
  urlTag,
  mainNavigation[]-> {
  ...,
  route-> { ..., 'localeTitle': page->title },
  submenuRoutes[]-> { ..., 'localeTitle': page->title },
},
  languages[]->,
  headerLogo,
  footerLogo,
  footerNavigation[]-> { ..., 'localeTitle': page->title },
  footerSecondLeftBlockContent,
  footerAddress,
  footerEmail,
  footerPhoneNumber,
  footerSchedule,
  footerSecondLeftBlockButton,
  footerBottomContent,
  newsletterBody,
  newsletterSubscribeSrc,
  followUsText,
  twitterUrl,
  linkedinUrl,
  youtubeUrl,
  shareThisStoryText,
}
`

export const DATA_EQUALS_SLUG = groq`*[_type == "route" && slug.current == $possibleSlug && $country in countries[]->urlTag][0]{
    page-> {
      ${pageFragment}
    }
  }`

export const DATA_IN_SLUG = groq`*[_type == "route" && slug.current in $possibleSlugs && $country in countries[]->urlTag][0]{
    page-> {
      ${pageFragment}
    }
  }`

export const DATA_IN_SLUG_BY_PATH = groq`*[_type == "route" && slug.current in $possibleSlugs][0]{
    page-> {
      ${pageFragment}
    }
  }`

export const ROUTES = groq`
*[_type == 'route'] {...}
`

export const BENEFIT_CARDS = groq`
*[_type == 'benefitCard'] {
  ...,
}
`

export const ITEMS = groq`
*[_type == 'item'] {
  ...,
}
`

export const TEAMS = groq`
*[_type == 'team'] {
  _id,
  _type,
  'localeName': name,
  'isFounder': isFounder,
  members[]-> {
    _id,
    _type,
    name,
    'localeJobTitle': jobTitle,
    'localeBio': bio,
    profilePhoto,
    linkedinUrl,
    email,
    contactText,
    readProfileText,
  },
  countries[]-> {_id},
}
`

export const TIMELINES =  groq`
*[_type == 'timeline'] {
  _id,
  _type,
  _rev,
  backgroundImage,
  leftFirstTextBlock,
  leftSecondTextBlock,
  items[]-> {
    _id,
    _type,
    'localeDateText': dateText,
    'localeDescriptionText': descriptionText
  },
}
`

export const LOCATIONS_DISPLAY =  groq`
*[_type == 'locationsDisplay'] {
  _id,
  _type,
  _rev,
  locations[]-> {
    _id,
    _type,
    'localeName': name,
    'localeDescription': description,
    googleMapsSrc,
    mainImage,
  }
}
`

export const TAB_ITEMS = groq`
*[_type == 'tabItem'] {
  _id,
  _type,
  _rev,
  'localecontentBlock': contentBlock,
  'localeButton': button,
  'localeName': name,
  isPaginatedNewsletter,
  isNewsCardsHorizontalLayout,
  selectedPostCategory->,
  newsCards[]-> {
    _id,
    _type,
    _rev,
    'localeButtonText': buttonText,
    'localeShortDescription': shortDescription,
    'localeSmallCardText': smallCardText,
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
  },
}
`

export const FUND_ITEMS = groq`
*[_type == 'fundItem'] {
  _id,
  _type,
  _rev,
  'localeName': name,
  'localeCodeTitle': codeTitle,
  'firstColumnTitle': firstColumnTitle,
  'thirdColumnTitle': thirdColumnTitle,
  'localeCodeObservation': codeObservation,
  'localeReadMoreText': readMoreText,
  'localeTextBetweenButtons': textBetweenButtons,
  'localeContactUsText': contactUsText,
  'localeObservation' : observation,
  'hiddenTitle': hiddenTitle,
  'bgColor': bgColor,
  fundSections[]-> {
    ...,
    fundSidebarItem[]-> {
      _id,
      _type,
      _rev,
      'localeTitle': title,
      'localeText': text,
      'localeObservation': observation,
      mainImage,
      listImage,
      listItems
    }
  },
  products[]-> {
    _id,
    _type,
    _rev,
    codes,
    'localeName': name,
    'localeHighlights': highlights,
    mainImage,
    mailtoLink,
    buttonColor,
    productIcon,
    'localeObservation' : observation,
    readMoreRoute->,
  },
}
`

export const FUND_CARDS = groq`
*[_type == 'fundCard'] {
  _id,
  _type,
  _rev,
  'localeHeading': heading,
  codes,
  'localeButton': button,
  'localeText': text,
  'localeDailyNav': dailyNav,
  'backgroundImage': backgroundImage
}
`

export const SITE_CONFIG_QUERY = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `
