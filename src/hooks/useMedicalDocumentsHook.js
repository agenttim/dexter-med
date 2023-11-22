import {useDispatch, useSelector} from 'react-redux';
import {
    fetchMedDocFailure,
    fetchMedDocRequest,
    fetchMedDocSuccess,
} from '../store/actions/medicalDocumentAction';

export const useMedicalDocumentsHook = () => {
    const dispatch = useDispatch();
    const {documents, loading, error} = useSelector((state) => state.medicalDocuments);

    const fetchData = async () => {
        try {
            dispatch(fetchMedDocRequest());

            const response = await fetch(
                'https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents.json'
            );
            const result = await response.json();
            const documentsArray = Object.entries(result).map(([id, data]) => ({id, ...data}));

            dispatch(fetchMedDocSuccess(documentsArray));
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(fetchMedDocFailure(error));
        }
    }

    const deleteDocument = async (id) => {
        try {
            await fetch(`https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents/${id}.json`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.error('Error deleting document:', error)
        }
    }

    return {documents, loading, error, fetchData, deleteDocument};
};
