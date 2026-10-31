import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BlueprintHeroSection from '../components/BlueprintHeroSection'
import { HOME_DESCRIPTION, HOME_TITLE } from '../../shared/routes.js'
import { usePageMeta } from '../hooks/usePageMeta'

const BlueprintSkillsSection = lazy(() => import('../components/BlueprintSkillsSection'))
const BlueprintCertificationsSection = lazy(() => import('../components/BlueprintCertificationsSection'))
const BlueprintProjectsSection = lazy(() => import('../components/BlueprintProjectsSection'))
const BlueprintPipelineSection = lazy(() => import('../components/BlueprintPipelineSection'))
const BlueprintMonitoringSection = lazy(() => import('../components/BlueprintMonitoringSection'))
const BlueprintRepoStructureSection = lazy(() => import('../components/BlueprintRepoStructureSection'))
const BlueprintContactSection = lazy(() => import('../components/BlueprintContactSection'))

export default function Home() {
  const location = useLocation()
  usePageMeta({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: '/' })

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    // Smooth anchor navigation; offset is handled by scroll-margin-top.
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div className="w-full">
      <BlueprintHeroSection />
      <Suspense fallback={null}>
        <BlueprintSkillsSection />
        <BlueprintCertificationsSection />
        <BlueprintProjectsSection />
        <BlueprintPipelineSection />
        <BlueprintMonitoringSection />
        <BlueprintRepoStructureSection />
        <BlueprintContactSection />
      </Suspense>
    </div>
  )
}