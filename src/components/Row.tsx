// @ts-ignore
import { Splide, SplideTrack } from '@splidejs/react-splide'
import RowItem from './RowItem'
import '../stylesheets/ContentSection.css'

export default function Row({ list }: { list: any }) {
  return (
    <div className="row" key={list.name}>
      <div className="sectionHeader">
        <div className="row-header">
          <span className="row-header__title sectionTitle">{list.name}</span>
        </div>        
      </div>
      <div className="row-container">
        <Splide hasTrack={false} options={{
          perPage: 6,
          padding: { left: '4%', right: '4%' },
          gap: '.4vw',
          lazyLoad: 'nearby',
          preloadPages: 2,
          speed: 750,
          easing: 'ease',
          drag: false,
          omitEnd: true,
          waitForTransition: true,
          breakpoints: {
            499: { perPage: 2 },
            799: { perPage: 3 },
            1099: { perPage: 4 },
            1399: { perPage: 5 },
          },
        }}>
          <SplideTrack>
            {list.items.map((item: any) => {
              return <RowItem item={item} key={item.videoId} category={list.name} />
            })}
          </SplideTrack>
        </Splide>
      </div>
    </div>
  )
}
