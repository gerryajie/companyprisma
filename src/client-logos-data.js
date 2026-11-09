const partnerFiles = [
  { id: 'alibabacloud', label: 'Alibaba Cloud' },
  { id: 'aws', label: 'AWS' },
  { id: 'cisco', label: 'Cisco' },
  { id: 'docker', label: 'Docker' },
  { id: 'fortinet', label: 'Fortinet' },
  { id: 'googlecloud', label: 'Google Cloud' },
  { id: 'huawei', label: 'Huawei' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'oracle', label: 'Oracle' },
  { id: 'redhat', label: 'Red Hat' },
  { id: 'vmware', label: 'VMware' },
]

export const clientLogos = partnerFiles.map((item) => ({
  name: item.id,
  label: item.label,
  src: `/partners/${item.id}.svg`,
}))
