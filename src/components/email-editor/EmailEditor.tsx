import { Bold, Eraser, Italic, Underline } from 'lucide-react'
import styles from './EmailEditor.module.scss'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { emailService } from '../../services/email.service'
import { useEditor } from './useEditor'

export function EmailEditor() {
	const { text, setText, applyFormat, textRef, updateSelection } = useEditor()

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['email create'],
		mutationFn: () => emailService.sendEmail(text),
		onSuccess() {
			setText('')
			queryClient.refetchQueries({ queryKey: ['email list'] })
		},
	})

	return (
		<div>
			<h1>Email Editor</h1>
			<div className={styles.card}>
				<textarea
					className={styles.editor}
					ref={textRef}
					onSelect={updateSelection}
					value={text}
					onChange={(e) => setText(e.target.value)}
				>
					{text}
				</textarea>
				<div className={styles.actions}>
					<div className={styles.tools}>
						<button onClick={() => setText('')}>
							<Eraser size={17} />
						</button>
						<button onClick={() => applyFormat('bold')}>
							<Bold size={17} />
						</button>
						<button onClick={() => applyFormat('italic')}>
							<Italic size={17} />
						</button>
						<button onClick={() => applyFormat('underline')}>
							<Underline size={17} />
						</button>
					</div>
					<button disabled={isPending} onClick={() => mutate()}>
						Send now
					</button>
				</div>
			</div>
		</div>
	)
}
