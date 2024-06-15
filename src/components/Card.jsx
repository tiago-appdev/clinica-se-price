/* eslint-disable react/prop-types */

import styles from "./Card.module.css";

export const Card = ({ children }) => {
	return <div className={styles.card}>{children}</div>;
};

export const CardHeader = ({ children }) => {
	return <div className={styles.cardHeader}>{children}</div>;
};

export const CardContent = ({ children }) => {
	return <div className={styles.cardContent}>{children}</div>;
};

export const CardFooter = ({ children }) => {
	return <div className={styles.cardFooter}>{children}</div>;
};

export const CardTitle = ({ children }) => {
	return <div className={styles.cardTitle}>{children}</div>;
};
