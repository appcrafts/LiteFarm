import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Card from '../Card';
import { ReactComponent as EmailIcon } from '../../assets/images/chooseFarm/emailIcon.svg';
import StatusLabel from './StatusLabel';
import { Main } from '../Typography';
import { ReactComponent as CalendarIcon } from '../../assets/images/managementPlans/calendar.svg';

import { useTranslation } from 'react-i18next';

// current && not selected -> grey 900
// current && selected -> teal 900
// not current && not selected -> teal 900
// not current && selected -> teal 900

const PureTaskCard = ({
  color = 'secondary',
  task,
  locations,
  crops,
  dueDate,
  assignee = null,
  style,
  onClick,
  ...props
}) => {
  const { t } = useTranslation();
  const tempCrop = 'Carrot';
  if (!locations.length) console.error('Task should be associated with at least one location');
  const locationText = locations.length > 1 ? t('TASK.CARD.MULTIPLE_LOCATIONS') : locations[0].name;

  return (
    <div className={styles.cardContainer}>
      {true && (
        <div className={styles.statusLabel}>
          <StatusLabel status={'planned'} />
        </div>
      )}
      <Card
        color={color}
        onClick={onClick}
        className={styles.card}
        style={{
          cursor: color === 'secondary' ? 'pointer' : 'default',
          ...style,
        }}
        {...props}
      >
        <div className={styles.icon}></div>
        <div className={styles.info}>
          <Main style={{ fontWeight: '600' }}>{'Transplant'}</Main>
          <div className={styles.subMain}>{`${locationText} | ${tempCrop}`}</div>
          <div className={styles.dateUserContainer}>
            <div className={styles.date}>
              <CalendarIcon className={styles.calendar} />
              {dueDate}
            </div>
            {assignee ? (
              <div className={styles.name}>
                <span>{assignee.first_name.charAt(0)}</span>
                {`${assignee.first_name} ${assignee.last_name.charAt(0)}.`}
              </div>
            ) : (
              <div className={styles.name}>
                <CalendarIcon className={styles.calendar} />
                {t('TASK.CARD.UNASSIGNED')}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

PureTaskCard.propTypes = {
  color: PropTypes.oneOf(['secondary', 'active', 'disabled']),
  onClick: PropTypes.func,
  ownerName: PropTypes.string,
  farmName: PropTypes.string,
  address: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
};

export default PureTaskCard;
