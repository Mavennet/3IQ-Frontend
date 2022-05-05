import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import page from './documents/page';
import route from './documents/route';
import siteConfig from './documents/siteConfig';
import category from './documents/category';
import person from './documents/person';
import post from './documents/post';
import country from './documents/country';
import language from './documents/language';

// Section documents
import heroWithImage from './documents/sections/heroWithImage';
import hero from './documents/sections/hero';
import imageWithText from './documents/sections/imageWithText';
import mailchimp from './documents/sections/mailchimp';
import imageBesideText from './documents/sections/imageBesideText';

// Object types
import cta from './objects/cta';
import embedHTML from './objects/embedHTML';
import figure from './objects/figure';
import internalLink from './objects/internalLink';
import link from './objects/link';
import portableText from './objects/portableText';
import simplePortableText from './objects/simplePortableText';
import bioPortableText from './objects/bioPortableText';
import postPortableText from './objects/postPortableText';
import textSection from './objects/textSection';

// Locale objects
import localeString from './objects/locale/localeString'
import localeText from './objects/locale/localeText'
import localeCta from './objects/locale/localeCta'
import localeSimplePortableText from './objects/locale/localeSimplePortableText'


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    cta,
    embedHTML,
    figure,
    imageWithText,
    internalLink,
    link,
    mailchimp,
    page,
    portableText,
    route,
    simplePortableText,
    siteConfig,
    textSection,
    bioPortableText,
    postPortableText,
    category,
    person,
    post,
    country,
    language,
    localeString,
    localeText,
    heroWithImage,
    imageBesideText,
    hero,
    localeCta,
    localeSimplePortableText,
  ]),
});
