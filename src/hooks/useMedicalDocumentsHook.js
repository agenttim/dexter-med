import {useDispatch, useSelector} from 'react-redux';
import {
    fetchMedDocFailure,
    fetchMedDocRequest,
    fetchMedDocSuccess,
} from '../store/actions/medicalDocumentAction';
import { API_URL } from '../globalConfig';


export const useMedicalDocumentsHook = () => {
    const dispatch = useDispatch();
    const {documents, loading, error} = useSelector((state) => state.medicalDocuments);
    const { token } = useSelector((state) => state.auth);

    const fetchData = async () => {
        try {
            dispatch(fetchMedDocRequest());

            const response = await fetch(`${API_URL}/medical-documents/byUser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            const documentsArray = Object.entries(result).map(([id, data]) => ({id, ...data}));
            console.log(documentsArray);
            console.log(token)

            dispatch(fetchMedDocSuccess(documentsArray));
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(fetchMedDocFailure(error));
        }
    }

    const deleteDocument = async (id) => {
        try {
            await fetch(`${API_URL}/medical-documents/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.error('Error deleting document:', error)
        }
    }

    const editDocument = async (id, newData) => {
        try {
            await fetch(`${API_URL}/medical-documents/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newData),
            });
        } catch (error) {
            console.error('Error editing document:', error);
        }
    }

    return {documents, loading, error, fetchData, deleteDocument, editDocument};
};
