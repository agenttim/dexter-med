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
                'http://192.168.107.174:8080/api/medical-documents'
            );
            const result = await response.json();
            const documentsArray = Object.entries(result).map(([id, data]) => ({id, ...data}));
            console.log(documentsArray)

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

    const editDocument = async (id, newData) => {
        try {
            await fetch(`https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents/${id}.json`, {
                method: 'PATCH',  // Используем метод PATCH для частичного обновления данных
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),  // Отправляем новые данные в формате JSON
            });
        } catch (error) {
            console.error('Error editing document:', error);
        }
    }

    return {documents, loading, error, fetchData, deleteDocument, editDocument};
};
