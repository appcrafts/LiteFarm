import Button from '../Form/Button';
import React from 'react';
import { Main, Semibold, Text } from '../Typography';
import { useTranslation } from 'react-i18next';
import Layout from '../Layout';
import Farmland from '../../assets/images/certification/Farmland.svg';
import { ReactComponent as Leaf } from '../../assets/images/signUp/leaf.svg';
import { colors } from '../../assets/theme';

export default function PureSetCertificationSummary({
  onSubmit,
  certificationTranslation,
  certifierAbbreviation,
  history,
  onGoBack,
  name,
  isRequesting,
  certificationType,
}) {
  const { t } = useTranslation(['translation', 'common']);
  return (
    <Layout
      onSubmit={onSubmit}
      buttonGroup={
        <>
          <Button onClick={onGoBack} color={'secondary'} fullLength>
            {t('common:BACK')}
          </Button>
          <Button type={'submit'} fullLength onClick={onSubmit}>
            {t('common:CONTINUE')}
          </Button>
        </>
      }
    >
      <Text style={{ paddingBottom: '4px' }}>{t('CERTIFICATION.SUMMARY.TITLE')}</Text>
      <Semibold style={{ color: colors.teal700 }}>
        {certificationTranslation}{' '}
        {certificationType +
          ' ' +
          t('CERTIFICATION.SUMMARY.CERTIFICATION') +
          ' ' +
          t('common:FROM') +
          ' ' +
          name}{' '}
        {certifierAbbreviation}
      </Semibold>
      <div style={{ paddingTop: '20px' }}>
        <img src={Farmland} style={{ width: '100%', transform: 'translateY(-12px)' }} />
      </div>

      <Main style={{ padding: '20px 0' }}>
        {isRequesting ? t('CERTIFICATION.SUMMARY.BAD_NEWS') : t('CERTIFICATION.SUMMARY.GOOD_NEWS')}
      </Main>
      <Main>
        {isRequesting
          ? t('CERTIFICATION.SUMMARY.BAD_NEWS_INFO')
          : t('CERTIFICATION.SUMMARY.INFORMATION')}{' '}
        <Leaf style={{ marginLeft: '4px' }} />
      </Main>
    </Layout>
  );
}