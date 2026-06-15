'use client';

interface ProgressStageBarProps {
  stages: string[];
  current_stage: string;
  progress_percentage: number;
}

export default function ProgressStageBar({
  stages,
  current_stage,
  progress_percentage,
}: ProgressStageBarProps) {
  const currentIndex = stages.indexOf(current_stage);

  return (
    <div className="w-full">
      {/* 百分比進度條 */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-amber-700">整體進度</span>
          <span className="text-sm font-bold text-amber-900">{progress_percentage}%</span>
        </div>
        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all"
            style={{ width: `${progress_percentage}%` }}
          />
        </div>
      </div>

      {/* 階段點 */}
      <div className="relative flex items-center justify-between">
        {/* 連接線底層 */}
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        {/* 已完成連接線 */}
        <div
          className="absolute top-3 left-0 h-0.5 bg-emerald-400 z-0 transition-all"
          style={{
            width:
              currentIndex >= 0
                ? `${(currentIndex / (stages.length - 1)) * 100}%`
                : '0%',
          }}
        />

        {stages.map((stage, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-1" style={{ minWidth: 0 }}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  isDone
                    ? 'bg-emerald-400 border-emerald-400 text-white'
                    : isCurrent
                    ? 'bg-orange-400 border-orange-400 text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? '✓' : index + 1}
              </div>
              <span
                className={`text-xs text-center leading-tight ${
                  isDone
                    ? 'text-emerald-600 font-medium'
                    : isCurrent
                    ? 'text-orange-600 font-bold'
                    : 'text-gray-400'
                }`}
                style={{ maxWidth: 40 }}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
