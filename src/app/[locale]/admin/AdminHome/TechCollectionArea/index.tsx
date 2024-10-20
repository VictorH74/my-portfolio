'use client';
import { IconButton } from '@/components/IconButton';
import { TechnologyLiItem } from '@/components/TechnologyLiItem';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useTechCollectionArea } from './useTechnologiesArea';
import { CollectionActions } from '../CollectionActions';
import { ReordableModal } from '../ReordableModal';

const AddTechFormModal = React.lazy(() => import('./AddTechFormModal'));

export const TechCollectionArea = () => {
    const hook = useTechCollectionArea();

    return (
        <section>
            <CollectionActions
                collectionName="Technologies"
                addFunc={hook.toggleAddTechFormVisibillity}
                reorderFunc={hook.toggleReorderModalVisibillity}
            />

            {hook.showAddTechForm && (
                <React.Suspense
                    fallback={
                        <span className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 py-2 w-full max-w-[400px] mx-2 text-center rounded-md bg-custom-gray-light">
                            Loading...
                        </span>
                    }
                >
                    <AddTechFormModal
                        selectedTech={hook.selectedTech}
                        setTechnologyArray={hook.setTechnologyArray}
                        resetFieldsCallback={() => hook.setSelectedTech(null)}
                        onClose={() => {
                            if (!!hook.selectedTech) hook.setSelectedTech(null);
                            hook.setShowAddTechForm(false);
                        }}
                    />
                </React.Suspense>
            )}

            <ul className="flex flex-wrap justify-center gap-3 mt-5">
                {hook.isTechArrayLoading
                    ? Array(6)
                          .fill(null)
                          .map((_, i) => (
                              <TechnologyLiItem
                                  key={i}
                                  className="max-sm:w-[70px] sm:w-[170px] sm:min-w-[170px] relative rounded-md overflow-hidden"
                              >
                                  <Skeleton
                                      variant="circular"
                                      width={70}
                                      height={70}
                                      sx={{
                                          backgroundColor: '#66666667',
                                      }}
                                      animation="pulse"
                                  />
                              </TechnologyLiItem>
                          ))
                    : hook.technologyArray.map((icon) => (
                          <TechnologyLiItem
                              key={icon.id}
                              className={twMerge(
                                  'max-sm:w-[70px] sm:w-[170px] sm:min-w-[170px] relative rounded-md',
                                  hook.selectedTech?.index == icon.index &&
                                      'outline outline-[var(--theme-color)]'
                              )}
                          >
                              <div className="absolute inset-0 bg-black/50 duration-200 opacity-0 hover:opacity-100 flex gap-2 items-center justify-center">
                                  <IconButton
                                      Icon={EditIcon}
                                      onClick={hook.makeSelectTech(icon)}
                                      type="button"
                                  />
                                  <IconButton
                                      Icon={RemoveIcon}
                                      onClick={hook.makeRemoveFunc(
                                          icon.id,
                                          icon.index
                                      )}
                                      type="button"
                                      disabled={!!hook.selectedTech}
                                  />
                              </div>

                              {icon.isMain && icon.hidden ? (
                                  <>
                                      <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                                      <VisibilityOffIcon className="absolute top-10 right-3 text-gray-500 pointer-events-none" />
                                  </>
                              ) : icon.isMain ? (
                                  <GradeIcon className="absolute top-3 right-3 text-[var(--theme-color)] pointer-events-none" />
                              ) : (
                                  icon.hidden && (
                                      <VisibilityOffIcon className="absolute top-3 right-3 text-gray-500 dark:text-[#3f3f3f] pointer-events-none" />
                                  )
                              )}

                              <Image
                                  loading="lazy"
                                  placeholder="empty"
                                  height={50}
                                  width={50}
                                  className="h-2/5 w-auto"
                                  src={icon.src}
                                  alt="icon"
                              />
                              <div className="tech-name ">
                                  <p
                                      className="primary-font-color"
                                      translate="no"
                                  >
                                      {icon.name}
                                  </p>
                              </div>
                          </TechnologyLiItem>
                      ))}
            </ul>

            {hook.showReorderModal && (
                <ReordableModal
                    onSubmit={hook.reorderTechs}
                    items={hook.technologyArray.map(({ id, name, src }) => ({
                        id,
                        value: JSON.stringify({ name, src }),
                    }))}
                    onClose={() => hook.setShowReorderModal(false)}
                >
                    {(item, index) => (
                        <div
                            key={item.id}
                            className="p-2 flex justify-between items-center"
                        >
                            <p>
                                {index} - {JSON.parse(item.value).name}
                            </p>
                            <Image
                                height={0}
                                width={0}
                                className="rounded-md w-auto h-[40px]"
                                alt="technology icon url"
                                src={JSON.parse(item.value).src}
                            />
                        </div>
                    )}
                </ReordableModal>
            )}
        </section>
    );
};
