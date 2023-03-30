import { TVShowListItem } from '../TVShowListItem/TVShowListItem';
import s from './TVShowList.module.css';

export function TVShowList({ tvShowList, onClick }) {
    return (
        <div className={s.container}>
            <div className={s.title}>You may also like : </div>
            <div className={s.list}>
                {tvShowList.map(tvShow => (
                    <span key={tvShow.id} className={s.tv_show_list_item}>
                        <TVShowListItem tvShow={tvShow} onClick={onClick} />
                    </span>
                ))}
            </div>
        </div>
    );
}