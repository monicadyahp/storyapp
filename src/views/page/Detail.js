import DetailPresenter from '../../presenter/DetailPresenter';
import DetailView from '../DetailView'; // Jalur impor yang benar

const Detail = () => {
    const detailView = new DetailView();
    const detailContainer = detailView.render();

    // Initialize presenter
    new DetailPresenter(detailView);

    return detailContainer;
};

export default Detail;
