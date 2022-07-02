import React, {Fragment, useRef, useState} from 'react';

import {Dialog, Transition} from '@headlessui/react';
import {ExclamationIcon} from '@heroicons/react/outline';
import {useDispatch} from "react-redux";

import {deleteArticleFromService} from "../../services/article-service";
import {deleteArticle} from "../../store/slices/article-slice";
import {sweetAlert} from "../../helpers/helpers";
import {setLoading} from "../../store/slices/loading-slice";
import {TrashIcon} from "@heroicons/react/solid";

function DeleteModal({articleId}) {
    const [showDeleteModal, setDeleteModal] = useState(false);

    const dispatch = useDispatch();

    const cancelButtonRef = useRef(null);

    let deleteHandler = async () => {
        dispatch(setLoading(true));

        setDeleteModal(false);

        try {
            await deleteArticleFromService(articleId);

            dispatch(deleteArticle(articleId));
            dispatch(setLoading(false));
            sweetAlert('کاربر موردنظر با موفقیت حذف شد');
        } catch (error) {
            sweetAlert(error.response.data.message, 'error');
            dispatch(setLoading(false));
        }
    }

    return (
        <>
            <TrashIcon className='h-5 w-5 text-rose-500 hover:text-rose-700 transition duration-200' onClick={() => setDeleteModal(true)}/>
            <Transition.Root show={showDeleteModal} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setDeleteModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-center justify-center">
                                    <div
                                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-right">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            حذف مقاله
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                آیا از حذف این مقاله مطمئن هستید؟
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex justify-center">
                                    <span
                                        className="inline-flex cursor-pointer justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                        onClick={deleteHandler}
                                    >
                                        حذف
                                    </span>
                                    <span
                                        className="mt-3 cursor-pointer w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setDeleteModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        انصراف
                                    </span>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default React.memo(DeleteModal);