import { EpisodeName } from './EpisodeName';

import { memo } from 'react';

import type { HTMLAttributes } from 'react';
import type { Episode } from '../model';

import { EntityField } from '@/shared/ui/EntityField';

interface EpisodeRowProps extends HTMLAttributes<HTMLLIElement> {
  episode: Episode;
  onTokenClick?: (type: Episode['episode']) => void;
}

export const EpisodeRow = memo((props: EpisodeRowProps) => {
  const { episode, onTokenClick, ...rest } = props;

  return (
    <li
      className="
    font-nunito
    shadow-sm shadow-navy-100 border rounded-md border-navy-100 transition-[box-shadow,border-color]
    hover:shadow-md hover:border-navy-200 hover:shadow-navy-200
    group
    "
      {...rest}
    >
      <div className="
      flex gap-2 items-stretch
      max-sm:block
      "
      >
        <div className="
        flex flex-auto basis-10/12 items-center py-2 px-2 gap-x-2
        max-sm:flex-col max-sm:px-2 max-sm:gap-y-4
        "
        >
          <div className="basis-5/12 max-xl:basis-7/12">
            <EpisodeName
              name={episode.name}
              episodeId={episode.id.toString()}
              className="
            font-bold
            max-sm:text-2xl
            "
            />
          </div>

          <div className="
          basis-7/12 grid grid-rows-1 grid-flow-col gap-x-6 gap-y-0.5 text-xs
          max-xl:basis-5/12 max-xl:text-sm max-xl:gap-x-2 max-xl:gap-y-1
          max-sm:w-full max-sm:grid-cols-1 max-sm:justify-items-center
          "
          >
            <EntityField
              label="Episode:"
              field={episode.episode}
              onFieldClick={onTokenClick}
            />
          </div>
        </div>
      </div>
    </li>
  );
});

EpisodeRow.displayName = 'EpisodeRow';
EpisodeRow.whyDidYouRender = false;
