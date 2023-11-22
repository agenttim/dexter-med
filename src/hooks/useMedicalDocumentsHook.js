// useMedicalDocumentsHook.js
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMedDocFailure,
    fetchMedDocRequest,
    fetchMedDocSuccess,
} from '../store/actions/medicalDocumentAction';

export const useMedicalDocumentsHook = () => {
    const dispatch = useDispatch();
    const { documents, loading, error } = useSelector((state) => state.medicalDocuments);

    const fetchData = async () => {
        try {
            dispatch(fetchMedDocRequest());

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await fetch(
                'https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents.json'
            );
            const result = await response.json();
            const documentsArray = Object.values(result);

            dispatch(fetchMedDocSuccess(documentsArray));
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(fetchMedDocFailure(error));
        }
    };

    return { documents, loading, error, fetchData };
};
