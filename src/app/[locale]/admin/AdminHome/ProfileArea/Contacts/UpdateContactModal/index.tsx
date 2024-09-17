import ModalContainer from '@/components/ModalContainer';
import useUpdateContactModal, {
    inputType,
    UpdateContactModalProps,
} from './useUpdateContactModal';
import { BRAZIL_PHONE_PATTERN } from '@/utils/constants';
import CloseIcon from '@mui/icons-material/Close';

export default function UpdateContactModal(props: UpdateContactModalProps) {
    const hook = useUpdateContactModal(props);

    return (
        <ModalContainer>
            <form
                onSubmit={hook.handleSubmit}
                className="w-full max-w-[500px] bg-gray-200 dark:bg-[#3f3f3f] rounded-md px-2 pb-3 animate-scale"
            >
                <div className="text-right py-2">
                    <button
                        disabled={hook.isLoading}
                        onClick={props.onClose}
                        type="button"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <input name="contact-key" defaultValue={props.contactKey} />
                <div className="flex flex-row w-full">
                    <hook.Icon sx={{ width: 50, height: 50 }} />
                    <input
                        type={inputType[props.contactKey]}
                        {...(props.contactKey == 'phone' && {
                            pattern: BRAZIL_PHONE_PATTERN,
                            title: 'Must be only digits',
                        })}
                        name="contact-value"
                        className="w-full p-2 border-2 border-custom-white rounded-md ml-2"
                        defaultValue={props.contactValue}
                        onChange={(e) =>
                            hook.setInputValue(e.currentTarget.value)
                        }
                        required
                    />
                </div>

                <button
                    disabled={hook.isLoading}
                    className="p-2 bg-[var(--theme-color)] w-full mt-2 rounded-md"
                >
                    {hook.isLoading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </ModalContainer>
    );
}