local utils = import '../../utils.libsonnet';

utils.makeCategory('Lavish Dude', [
  import './fawm_2022.libsonnet',
  import './fawm_2021.libsonnet',
  import './fawm_2019.libsonnet'
])
