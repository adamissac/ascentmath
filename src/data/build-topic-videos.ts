import type { Topic, VideoResource } from "./units";
import { TOPIC_VIDEO_SUPPLEMENTS } from "./topic-video-supplements";
import { VIDEOS_PER_TOPIC } from "./units";

function dedupeByVideoId(videos: VideoResource[]): VideoResource[] {
  const seen = new Set<string>();
  return videos.filter((v) => {
    if (seen.has(v.videoId)) return false;
    seen.add(v.videoId);
    return true;
  });
}

/** Merge source videos and supplements into exactly four unique walkthroughs. */
export function buildTopicVideos(topic: Topic): VideoResource[] {
  const base: VideoResource[] = [topic.video, ...(topic.extraVideo ? [topic.extraVideo] : [])];
  const supplements = TOPIC_VIDEO_SUPPLEMENTS[topic.id] ?? [];
  const merged = dedupeByVideoId([...base, ...supplements]);

  if (merged.length < VIDEOS_PER_TOPIC) {
    throw new Error(
      `${topic.id}: expected ${VIDEOS_PER_TOPIC} videos, got ${merged.length} (base ${base.length}, supplements ${supplements.length})`
    );
  }

  return merged.slice(0, VIDEOS_PER_TOPIC);
}
