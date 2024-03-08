import { type Episode, EpisodeRow } from '@/entities/episode';

interface EpisodesListProps extends React.HTMLAttributes<HTMLUListElement> {
  episodes: Episode[];
  onTokenClick?: (value: Episode['episode']) => void;
}
export function EpisodesList(props: EpisodesListProps) {
  const { episodes, className, onTokenClick, ...rest } = props;

  return (
    <ul className={`space-y-3 ${className ?? ''}`} {...rest}>
      {episodes.map(episode => (
        <EpisodeRow
          key={episode.id}
          episode={episode}
          onTokenClick={onTokenClick}
        />
      ))}
    </ul>
  );
}
