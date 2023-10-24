/*
 *  Copyright 2023 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function IconDescriptionListItem({
  listItemKey,
  icon,
  label,
  onClick,
  className,
  description,
  ...props
}) {
  return (
    <li key={listItemKey} onClick={onClick} className={clsx(className, styles.listItem)} {...props}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.content_label}>{label}</div>
        {description && <div className={styles.content_description}>{description}</div>}
      </div>
    </li>
  );
}

IconDescriptionListItem.propTypes = {
  listItemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
