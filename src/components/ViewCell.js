import { useNavigate } from 'react-router-dom';

export default function ViewCell({ params, label }) {
    const navigate = useNavigate();
    const handleViewClick = (rowId) => {
        if (label === 'Track') {
            navigate('/trackLoan/' + rowId)
        } else {
            navigate('/viewLoan/' + rowId)
            console.log('View clicked for row with ID:', rowId);
        }
    };
    return (
        <div className="view-button" onClick={() => handleViewClick(params.row.id)}>
            {label}
        </div>
    );
};
