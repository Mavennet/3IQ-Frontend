import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// Document types
import page from "./documents/page";
import route from "./documents/route";
import siteConfig from "./documents/siteConfig";
import person from "./documents/person";
import benefity from "./documents/benefity";
import country from "./documents/country";
import language from "./documents/language";
import post from "./documents/post";
import benefitCard from "./documents/benefitCard";
import item from "./documents/item";
import menuItem from "./documents/menuItem";
import team from "./documents/team";
import timelineItem from "./documents/timelineItem";
import location from "./documents/location";
import tabItem from "./documents/tabItem";
import product from "./documents/product";
import fundItem from "./documents/fundItem";
import fundCard from "./documents/fundCard";
import fundSidebarItem from "./documents/fundSidebarItem";
import category from "./documents/category";
import imagesContainer from "./documents/imagesContainer";

// Section documents
import textSection from "./documents/sections/textSection";
import heroWithImage from "./documents/sections/heroWithImage";
import heroSailGP from "./documents/sections/heroSailGP";
import ourFunds from "./documents/sections/ourFunds";
import componentsTests from "./documents/sections/componentsTests";
import animatedHero from "./documents/sections/animatedHero";
import hero from "./documents/sections/hero";
import heroFirstVariation from "./documents/sections/heroFirstVariation";
import heroDoubleButton from "./documents/sections/heroDoubleButton";
import heroBigImage from "./documents/sections/heroBigImage";
import heroNft from './documents/sections/heroNft';
import highlights from './documents/sections/highlights';
import imageWithText from "./documents/sections/imageWithText";
import mailchimp from "./documents/sections/mailchimp";
import advertisement from "./documents/sections/advertisement";
import mainHero from "./documents/sections/mainHero";
import podcasts from "./documents/sections/podcasts";
import search from "./documents/sections/search";
import articlesSearch from "./documents/sections/articlesSearch";
import teamsVideoDisplay from "./documents/sections/teamsVideoDisplay";
import imageBesideText from "./documents/sections/imageBesideText";
import quoteHeads from "./documents/sections/quoteHeads";
import quoteFounder from "./documents/sections/quoteFounder";
import quoteHeadsDubai from "./documents/sections/quoteHeadsDubai";
import fundsDisclaimer from "./documents/sections/fundsDisclaimer";
import readyToInvest from "./documents/sections/readyToInvest";
import awards from "./documents/sections/awards";
import note from "./documents/sections/note";
import doubleOptions from "./documents/sections/doubleOptions";
import sideBySideImages from "./documents/sections/sideBySideImages";
import keyBenefits from "./documents/sections/keyBenefits";
import newsCard from "./documents/sections/newsCard";
import automatedNewsCard from "./documents/sections/automatedNewsCard";
import automatedArticles from "./documents/sections/automatedArticles";
import readMoreCard from "./documents/sections/readMoreCard";
import teamsDisplay from "./documents/sections/teamsDisplay";
import whatWeOffer from "./documents/sections/whatWeOffer";
import timeline from "./documents/sections/timeline";
import contactUsForm from "./documents/sections/contactUsForm";
import subscribeForm from "./documents/sections/subscribeForm";
import locationsDisplay from "./documents/sections/locationsDisplay";
import plainText from "./documents/sections/plainText";
import textSeparator from "./documents/sections/textSeparator";
import headlineWithImages from "./documents/sections/headlineWithImages";
import descriptionsWithButton from "./documents/sections/descriptionsWithButton";
import tabsContent from "./documents/sections/tabsContent";
import subscribeBlock from "./documents/sections/subscribeBlock";
import fundsContent from "./documents/sections/fundsContent";
import fundsOverview from "./documents/sections/fundsOverview";
import lineChart from "./documents/sections/lineChart";
import tableSection from "./documents/sections/tableSection";
import tableCripto from "./documents/sections/tableCripto";
import articles from "./documents/sections/articles";

// Object types
import cta from "./objects/cta";
import embedHTML from "./objects/embedHTML";
import figure from "./objects/figure";
import internalLink from "./objects/internalLink";
import link from "./objects/link";
import portableText from "./objects/portableText";
import simplePortableText from "./objects/simplePortableText";
import bioPortableText from "./objects/bioPortableText";
import postPortableText from "./objects/postPortableText";
import youtube from "./objects/youtube";

// Locale objects
import localeString from "./objects/locale/localeString";
import localeText from "./objects/locale/localeText";
import localeCta from "./objects/locale/localeCta";
import localeSimplePortableText from "./objects/locale/localeSimplePortableText";
import localePortableText from "./objects/locale/localePortableText";
import localeBioPortableText from "./objects/locale/localeBioPortableText";
import localeFigure from "./objects/locale/localeFigure";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    cta,
    embedHTML,
    figure,
    imageWithText,
    internalLink,
    link,
    mailchimp,
    advertisement,
    mainHero,
    podcasts,
    search,
    articlesSearch,
    teamsVideoDisplay,
    page,
    portableText,
    route,
    simplePortableText,
    siteConfig,
    textSection,
    bioPortableText,
    postPortableText,
    person,
    benefity,
    doubleOptions,
    keyBenefits,
    benefitCard,
    item,
    post,
    country,
    language,
    localeString,
    localeText,
    heroWithImage,
    heroSailGP,
    ourFunds,
    componentsTests,
    animatedHero,
    heroFirstVariation,
    heroDoubleButton,
    heroBigImage,
    heroNft,
    highlights,
    imageBesideText,
    hero,
    localeCta,
    localeSimplePortableText,
    note,
    quoteHeads,
    quoteFounder,
    quoteHeadsDubai,
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
    whatWeOffer,
    timeline,
    timelineItem,
    subscribeForm,
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
    fundCard,
    fundSidebarItem,
    product,
    category,
    imagesContainer,
    lineChart,
    tableSection,
    tableCripto,
    articles,
    localeFigure
  ])
});
