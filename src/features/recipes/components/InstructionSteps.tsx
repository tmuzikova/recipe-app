import { useTranslation } from 'react-i18next';

type Block = {
  _type: string;
  children?: { text: string }[];
  style?: string;
};

type InstructionStepsProps = {
  blocks: unknown;
};

export const InstructionSteps = ({ blocks }: InstructionStepsProps) => {
  const { t } = useTranslation();

  if (!Array.isArray(blocks)) return null;

  const paragraphs = (blocks as Block[]).filter(
    (block) => block._type === 'block' && block.children,
  );

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {t('recipe.instructions.heading')}
      </h2>
      <ol className="space-y-4">
        {paragraphs.map((block, index) => {
          const text = block.children?.map((c) => c.text).join('') ?? '';
          return (
            <li key={index} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                {index + 1}
              </span>
              <p className="pt-0.5 text-gray-700 leading-relaxed">{text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
