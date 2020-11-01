import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);
	const { alerts } = alertContext;
	const { id, msg, type } = alerts;
	return (
		alerts.id !== undefined && (
			<div key={id} className={`alert alert-${type}`}>
				<i className={'fas fa-info-circle'} /> {msg}
			</div>
		)
	);
};

export default Alerts;
