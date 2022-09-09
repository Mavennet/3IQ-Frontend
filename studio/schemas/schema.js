import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import page from './documents/page';
import route from './documents/route';
import siteConfig from './documents/siteConfig';
import person from './documents/person';
import country from './documents/country';
import language from './documents/language';
import menuItem from './documents/menuItem';
import team from './documents/team';

// Section documents
import textSection from './documents/sections/textSection';
import heroWithImage from './documents/sections/heroWithImage';
import hero from './documents/sections/hero';
import imageWithText from './documents/sections/imageWithText';
import mailchimp from './documents/sections/mailchimp';
import imageBesideText from './documents/sections/imageBesideText'
import doubleOptions from './documents/sections/doubleOptions';
import sideBySideImages from './documents/sections/sideBySideImages';
import post from './documents/post';
import newsCard from './documents/sections/newsCard';
import teamsDisplay from './documents/sections/teamsDisplay';
import timeline from './documents/sections/timeline';

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

// Locale objects
import localeString from './objects/locale/localeString'
import localeText from './objects/locale/localeText'
import localeCta from './objects/locale/localeCta'
import localeSimplePortableText from './objects/locale/localeSimplePortableText'
import localePortableText from './objects/locale/localePortableText'
import localeBioPortableText from './objects/locale/localeBioPortableText'

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
    person,
    doubleOptions,
    post,
    country,
    language,
    localeString,
    localeText,
    heroWithImage,
    timeline,
    imageBesideText,
    hero,
    localeCta,
    localeSimplePortableText,
    sideBySideImages,
    menuItem,
    localePortableText,
    newsCard,
    localeBioPortableText,
    team,
    teamsDisplay,
  ]),
});
