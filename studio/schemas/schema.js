import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import page from './documents/page';
import route from './documents/route';
import siteConfig from './documents/siteConfig';
import person from './documents/person';
import country from './documents/country';
import language from './documents/language';
import post from './documents/post';
import benefitCard from './documents/benefitCard'
import menuItem from './documents/menuItem';
import team from './documents/team';
import timelineItem from './documents/timelineItem';
import location from './documents/location';
import tabItem from './documents/tabItem';
import product from './documents/product';
import fundItem from './documents/fundItem';
import fundSidebarItem from './documents/fundSidebarItem';
import category from './documents/category';
import imagesContainer from './documents/imagesContainer';

// Section documents
import textSection from './documents/sections/textSection';
import heroWithImage from './documents/sections/heroWithImage';
import hero from './documents/sections/hero';
import heroFirstVariation from './documents/sections/heroFirstVariation';
import heroDoubleButton from './documents/sections/heroDoubleButton';
import imageWithText from './documents/sections/imageWithText';
import mailchimp from './documents/sections/mailchimp';
import imageBesideText from './documents/sections/imageBesideText'
import quoteHeads from './documents/sections/quoteHeads';
import fundsDisclaimer from './documents/sections/fundsDisclaimer';
import readyToInvest from './documents/sections/readyToInvest';
import awards from './documents/sections/awards';
import note from './documents/sections/note';
import doubleOptions from './documents/sections/doubleOptions';
import sideBySideImages from './documents/sections/sideBySideImages';
import keyBenefits from './documents/sections/keyBenefits';
import newsCard from './documents/sections/newsCard';
import automatedNewsCard from './documents/sections/automatedNewsCard';
import automatedArticles from './documents/sections/automatedArticles';
import readMoreCard from './documents/sections/readMoreCard';
import teamsDisplay from './documents/sections/teamsDisplay';
import timeline from './documents/sections/timeline';
import contactUsForm from './documents/sections/contactUsForm';
import locationsDisplay from './documents/sections/locationsDisplay';
import plainText from './documents/sections/plainText';
import textSeparator from './documents/sections/textSeparator';
import headlineWithImages from './documents/sections/headlineWithImages';
import descriptionsWithButton from './documents/sections/descriptionsWithButton';
import tabsContent from './documents/sections/tabsContent';
import subscribeBlock from './documents/sections/subscribeBlock';
import fundsContent from './documents/sections/fundsContent';
import fundsOverview from './documents/sections/fundsOverview';
import lineChart from './documents/sections/lineChart';
import tableSection from './documents/sections/tableSection';
import tableCripto from './documents/sections/tableCripto';
import articles from './documents/sections/articles';

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
import youtube from './objects/youtube';

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
    keyBenefits,
    benefitCard,
    post,
    country,
    language,
    localeString,
    localeText,
    heroWithImage,
    heroFirstVariation,
    heroDoubleButton,
    imageBesideText,
    hero,
    localeCta,
    localeSimplePortableText,
    note,
    quoteHeads,
    fundsDisclaimer,
    readyToInvest,
    awards,
    sideBySideImages,
    menuItem,
    localePortableText,
    newsCard,
    automatedNewsCard,
    automatedArticles,
    readMoreCard,
    localeBioPortableText,
    team,
    teamsDisplay,
    timeline,
    timelineItem,
    contactUsForm,
    locationsDisplay,
    location,
    plainText,
    textSeparator,
    headlineWithImages,
    descriptionsWithButton,
    tabsContent,
    tabItem,
    subscribeBlock,
    youtube,
    fundsContent,
    fundsOverview,
    fundItem,
    fundSidebarItem,
    product,
    category,
    imagesContainer,
    lineChart,
    tableSection,
    tableCripto,
    articles
  ]),
});
