import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Button from '../Form/Button';
import MultiStepPageTitle from '../PageTitle/MultiStepPageTitle';
import { useTranslation } from 'react-i18next';
import { Main, Semibold } from '../Typography';
import Layout from '../Layout';
import { colors } from '../../assets/theme';
import RegisteredCertifierQuestionsSurvey from './RegisteredCertifierQuestions';
import RegisteredCertifierNoQuestionsSurvey from './RegisteredCertifierNoQuestions';
import UnregisteredCertifierSurvey from './UnregisteredCertifier';
import CancelFlowModal from '../Modals/CancelFlowModal';
import useHookFormPersist from '../../containers/hooks/useHookFormPersist';

const certifiersWithQuestions = ['FVOPA'];

const PureCertificationSurveyPage = ({
  onExport,
  handleGoBack,
  handleCancel,
  certifier,
  requested_certifier,
  persistedFormData,
}) => {
  const { t } = useTranslation();
  const [submissionId, setSubmissionId] = useState(undefined);
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);

  const persistedPath = ['/certification/report_period'];
  useHookFormPersist(persistedPath, () => ({}));

  const progress = 33;

  useEffect(() => {
    const handler = (event) => {
      // console.log(event);
      if (typeof event.data !== 'string') return; // TODO: figure out better way to filter iframe message. maybe source?
      const data = JSON.parse(event.data);
      console.log('Hello World?', data);
      setSubmissionId('60df45608b55990001f24afd');
    };

    window.addEventListener('message', handler);

    // clean up
    return () => window.removeEventListener('message', handler);
  }, []);

  let surveyBody;
  const { certifier_acronym } = certifier ?? {};
  const hasQuestions = certifiersWithQuestions.includes(certifier_acronym);
  if (requested_certifier) {
    surveyBody = <UnregisteredCertifierSurvey />;
  } else {
    if (hasQuestions) {
      // TODO: this is hard coded for the purpose of proof-of-concept
      surveyBody = <RegisteredCertifierQuestionsSurvey certiferAcronym={certifier_acronym} />;
    } else {
      surveyBody = <RegisteredCertifierNoQuestionsSurvey />;
    }
  }

  return (
    <>
      <Layout
        buttonGroup={
          <Button
            fullLength
            onClick={() =>
              onExport({
                ...persistedFormData,
                submissionId,
              })
            }
            disabled={hasQuestions && !submissionId}
          >
            {t('CERTIFICATIONS.EXPORT')}
          </Button>
        }
      >
        <MultiStepPageTitle
          style={{ marginBottom: '24px' }}
          onGoBack={handleGoBack}
          onCancel={() => setShowConfirmCancelModal(true)}
          title={t('CERTIFICATIONS.EXPORT_DOCS')}
          value={progress}
        />

        {surveyBody}
      </Layout>
      {showConfirmCancelModal && (
        <CancelFlowModal
          dismissModal={() => setShowConfirmCancelModal(false)}
          handleCancel={handleCancel}
          flow={t('CERTIFICATIONS.FLOW_TITLE')}
        />
      )}
    </>
  );
};

PureCertificationSurveyPage.propTypes = {
  onExport: PropTypes.func,
  handleGoBack: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default PureCertificationSurveyPage;
