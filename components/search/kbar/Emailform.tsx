import { MailIcon } from "../icons"
import { ModalBody } from "@/components/formspree/CBody"

interface EmailFormProps {
  state: any
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  name: string
  email: string
  message: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  t: (key: string) => string
}

const EmailForm: React.FC<EmailFormProps> = ({
  state,
  handleSubmit,
  name,
  email,
  message,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  t,
}) => (
  <>
    <div className="ml-2 mt-5 flex flex-row items-center text-3xl font-semibold text-heading-400">
      <span>
        <MailIcon className="mr-1 size-6" />
      </span>
      <div>{t("title")}</div>
    </div>
    <div className="my-16 mx-2">
      <ModalBody
        handleSubmit={handleSubmit}
        name={name}
        email={email}
        message={message}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleMessageChange={handleMessageChange}
        state={state}
        t={t}
      />
    </div>
  </>
)

export default EmailForm
