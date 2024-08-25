/**
 * Contains details about meta tags like title and others.
 * 
 * Reusable component import it in all pages file and send required details as props.
 * Also extend the file if OG tags has to be added
 */
import Head from 'next/head';
import React from 'react';
import MetaInfoProps from '@/types/MetaInfoProps';

const MetaInfo: React.FC<MetaInfoProps> = ({
  title = 'Default Title',
  description = 'Default description',
  keywords = 'default, keywords',
  author = 'Default Author',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
  </Head>
);

export default MetaInfo;
