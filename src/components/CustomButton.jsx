import React from 'react';
import PropTypes from 'prop-types';
import { CButton } from '@coreui/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import styles from '../css/CustomButton.module.css';

function CustomButton({ text, onClick, Icon }) {
  return (
    <CButton onClick={onClick} className={styles.button}>
        {text} <Icon className={styles.icon} />
    </CButton>
  );
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    Icon: PropTypes.elementType.isRequired,
};

CustomButton.defaultProps = {
    onClick: () => {},
    Icon: ArrowRightIcon,
};

export default CustomButton;
