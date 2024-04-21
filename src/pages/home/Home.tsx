import { EmailEditor } from '../../components/email-editor/EmailEditor'
import { EmailList } from '../../components/email-list/EmailList'
import styles from './Home.module.scss'

export function Home() {
	return (
		<div className={styles.home}>
			<EmailEditor />
			<EmailList />
		</div>
	)
}
